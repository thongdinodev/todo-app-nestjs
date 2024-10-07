import { User } from "../user/entities/user.entity";

declare global {
  namespace Express {
    interface Request {
      user?: User; // Thêm thuộc tính user vào request, bạn có thể tùy chỉnh kiểu của user
    }
  }
}