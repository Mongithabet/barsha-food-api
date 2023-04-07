import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';


@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  mimetype: string;

  @Column()
  filename: string;

  @Column({ select: false })
  originalname: string;

  @Column()
  extension: string;

  @Column()
  size: number;

  @Column({ select: false })
  destination: string;

  @Column()
  protected_url: string;

  @Column()
  public_url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  setFileUrls() {
    if (!this.protected_url) {
      this.protected_url = `/files/${this.filename}/download`;
    }

    if (!this.public_url) {
      this.public_url = `/public/uploads/${this.filename}`;
    }
  }
}

