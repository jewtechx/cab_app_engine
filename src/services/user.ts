import IService, { IAppContext } from '../types/app';
import { IUserAuth, IUserInput, IUserResetPasswordInput, IUserVerificationInput } from '../types/user/user';
import sendSms from '../utils/sms';
import log from '../utils/log';
import otp from 'otp-generator'

export default class UserService extends IService {
  constructor(context: IAppContext) {
    super(context);
  }

  // registers user
  async registerUser(input:{phoneNumber:string}){
    try {
      const {phoneNumber} = input
      const _user = await this.models.User.findOne({ phoneNumber});
      if (_user) throw new Error('User already exists');

      const user = new this.models.User({phoneNumber});
      await user.save();

      await sendSms(phoneNumber,`This is your cab app verification code: ${user.verificationCode}. Thank you for signing up.`)

      return user
      
    } catch (e) {
      throw new Error(`Error creating new user: ${e}`);
    }
  }

  //verifies user
  async verifyUser(VerifyUserInput: IUserVerificationInput): Promise<boolean> {
    const { id, verificationCode } = VerifyUserInput;
    try {
      // Find the user by Id
      const user = await this.authenticate_user(id)
      // Check if the user is already verified
      if (user.verified) {
        throw new Error('User is already verified');
      }

      // Check if verificationCode matches
      if (user.verificationCode != verificationCode) {
        throw new Error('Invalid verification code');
      }

      // Set verified to true and save user
      user.verified = true;
      await user.save();

      return true;
    } catch (e) {
      throw new Error(`Error validating user: ${e}`);
    }
  }

  // sends password reset code to user's email
  async forgotPassword(ForgotPasswordInput: { phoneNumber: string }) {
    const { phoneNumber } = ForgotPasswordInput;

    const user = await this.models.User.findOne({ phoneNumber });

    if (!user) {
      throw new Error('user not found');
    }

    if (!user.verified) {
      throw new Error('user is not verified');
    }

    const passwordResetCode = otp.generate(4,{upperCaseAlphabets:false,specialChars:false,lowerCaseAlphabets:false});

    user.passwordResetCode = passwordResetCode;

    await user.save();

    await sendSms(phoneNumber,`This is your cab app password reset code:${user.passwordResetCode}`)

    log.debug(`Password reset code sent to ${user.phoneNumber}`);

    const message = 'password reset code sent';
    return message;
  }

  // resets user's password to new password from email
  async resetPassword(ResetPasswordInput: IUserResetPasswordInput) {
    const { id, passwordResetCode, newPassword } = ResetPasswordInput;

    const user = await this.authenticate_user(id)
    console.log(passwordResetCode)
    console.log(user.passwordResetCode)

    if (!user || user.passwordResetCode !== passwordResetCode) {
      throw new Error('Could not reset password');
    }

    user.passwordResetCode = null;

    user.password = newPassword;

    await user.save();  

    const message = 'Successfully updated password';
    return message;
  }

  // login user
  async loginUser(LoginUserInput: any) {
    const { phoneNumber, password } = LoginUserInput;

    const user = await this.models.User.findOne({ phoneNumber });
    if (!user) {
      throw new Error('user not found');
    }

    try {
      const valid = await user.validatePassword(password);
      if (!valid) {
        throw new Error('password incorrect');
      }
    } catch (e) {
      throw new Error(e);
    }

    return user;
  }

  // updates user details
  async updateUser(UpdateUserInput: any, userId: any) {
    try {
      const user = await this.authenticate_user(userId)
  
      if ('rating' in UpdateUserInput) {
        user.rating = UpdateUserInput.rating;
      } else {
        if (user._id.toString() !== userId.toString()) {
          throw new Error(`Unauthorized: Cannot update another user's details`);
        }
  
        for (const key in UpdateUserInput) {
          if (key !== 'rating') {
            user[key] = UpdateUserInput[key];
          }
        }
      }
  
      await user.save();
  
      return user;
    } catch (e) {
      throw new Error(`Error updating user: ${e.message}`);
    }
  }
  
  // deletes user account
  async deleteUser(id: any) {
    const user = await this.authenticate_user(id)
    if(!user){
      throw new Error('Error deleting user')
    }

    try {
      await this.models.User.findByIdAndDelete(id);
      return `Deleted user successfully`;
    } catch (e) {
      throw new Error(`Error deleting user`);
    }
  }

  // getting user rating
  async getUserRating(userId: any) {
    try {
      const user = await this.models.User.findOne({_id:userId});
      if (user.rating.length === 0) {
        return {
          averageRating: 0,
          totalRatings: 0,
        };
      }

      const totalScore = user.rating.reduce((sum: any, rating: any) => sum + rating.score, 0);
      const averageRating = totalScore / user.rating.length;

      return {
        averageRating,
        totalRatings: user.rating.length,
      };
    } catch (error) {
      throw new Error('Failed to fetch ratings');
    }
  }
}
