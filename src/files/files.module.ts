import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { FileRepository } from './repositories/file.repository';

@Module({
  imports: [
    TypeOrmExModule.
      forCustomRepository([
        FileRepository
      ]),
  ],
  controllers: [FilesController],
  providers: [FilesService]
})
export class FilesModule {}
