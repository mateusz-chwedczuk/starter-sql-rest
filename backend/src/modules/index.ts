import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';

export const modules = [CommonModule, DatabaseModule, UserModule, AuthModule];
