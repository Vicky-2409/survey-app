import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { HttpStatus } from "../constants/http-status.enum";
import { Messages } from "../constants/messages.constant";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const token = await this.authService.login(email, password);

      if (!token) {
        res.status(HttpStatus.UNAUTHORIZED).json({
          message: Messages.INVALID_CREDENTIALS,
        });
        return;
      }

      res.status(HttpStatus.OK).json({
        message: Messages.AUTH_SUCCESS,
        token,
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: Messages.SERVER_ERROR,
      });
    }
  };

  validateToken = async (req: Request, res: Response): Promise<void> => {
    try {
      res.status(HttpStatus.OK).json({
        valid: true,
        user: req.user,
      });
    } catch (error) {
      console.error("Error validating token:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: Messages.SERVER_ERROR,
      });
    }
  };
}
