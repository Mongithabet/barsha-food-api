import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { UploadFileMulterDto } from './dto/upload-file-multer.dto';
import { UploadFileDto } from './dto/upload-file.dto';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { UploadFilesDto } from './dto/upload-files.dto';

@ApiTags('File')
@Controller('files')

export class FilesController {
  constructor(private fileService: FilesService) {}

  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body() uploadFileDto: UploadFileDto,
    @UploadedFile() file: UploadFileMulterDto,
  ) {
    return this.fileService.uploadFile(file);
  }

  @Post('/upload-multiple')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(
    @CurrentUser() user: User,
    @Body() uploadFilesDto: UploadFilesDto,
    @UploadedFiles() files: UploadFileMulterDto[],
  ) {
    return this.fileService.uploadFiles(files, user.id);
  }
}