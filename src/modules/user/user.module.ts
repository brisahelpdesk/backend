import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PersistenceModule } from '../persistence/persistence.module';
import { UserRepository } from './user.repository';

@Module({
    imports: [PersistenceModule],
    providers: [UserService, UserRepository],
    exports: [UserService], // Export the service so other modules can use it
})
export class UserModule {}
