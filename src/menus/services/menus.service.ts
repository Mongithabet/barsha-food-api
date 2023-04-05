import { HttpException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from '../dto/create-menu.dto';
import { MenuVerificationStatusEnum } from '../enums/menu-verification-status.enum';
import { MenuRepository } from '../repositories/menu.repository';
import { UpdateMenuDto } from '../dto/update-menu.dto';
import { FilterApproveMenuDto } from '../dto/filter-approve-menu.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Menu } from '../entities/menu.entity';

@Injectable()
export class MenusService {
  constructor(
    private menuRepository: MenuRepository,
    @InjectDataSource() private dataSource: DataSource) { }

  findOne(id: string) {
    return this.menuRepository.findOne({
      where: { id },
      relations: ['items', 'items.image', 'servingTimes'],
    });
  }


  findAll(filterApproveMenuDto: FilterApproveMenuDto) {
    return this.menuRepository.find(
      {
        relations: ['restaurant'],
        where: {
          verificationStatus: filterApproveMenuDto.verificationStatus
        }
      }
    );
  }

  create(createMenuDto: CreateMenuDto) {
    return this.menuRepository.save(createMenuDto);
  }

  findAllByRestaurant(restaurantId: string) {
    return this.menuRepository.findMenusByRestaurant(restaurantId);
  }

  update = (id: string, updateMenuDto: UpdateMenuDto) => {
    return this.menuRepository.update(id, updateMenuDto)
  }

  approve = (id: string) =>
    this.menuRepository.update(id, { verificationStatus: MenuVerificationStatusEnum.APPROVED })

  reject = (id: string) =>
    this.menuRepository.update(id, { verificationStatus: MenuVerificationStatusEnum.REJECTED })

  activate = async (id: string) => {
    const fetchedMenu = await this.menuRepository.findOneBy({ id });
    if (fetchedMenu.verificationStatus == MenuVerificationStatusEnum.REJECTED)
      throw new NotAcceptableException();
    return this.menuRepository.update(id, { isActive: true })
  }

  disable = (id: string) => this.menuRepository.update(id, { isActive: false })

  remove = async (id: string) => {
    // create a new query runner
    const queryRunner = this.dataSource.createQueryRunner()

    // establish real database connection using our new query runner
    await queryRunner.connect()

    // lets now open a new transaction:
    await queryRunner.startTransaction()

    try {
      const fetchedMenu = await queryRunner.manager.findOne(
        Menu,
        {
          where: { id },
          relations: ['items', 'items.menu']
        }
      );
      if (!fetchedMenu) throw new NotFoundException();
      if (fetchedMenu.isDefault == true) throw new NotAcceptableException('CANNOT DELETE MAIN MENU');
      for (const item of fetchedMenu.items) {
  
      }
      return this.menuRepository.remove(fetchedMenu);

      // commit transaction now
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction()
      throw new HttpException(err, err.status);
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release()
    }
    
  }
}
