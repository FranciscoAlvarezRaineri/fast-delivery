import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EntityRepository } from '../../../common/database/repository/db.repository';
import { Package, PackageDocument } from '../entities/package.entity';
import { PackageStatus } from '../interface/package.interface';

@Injectable()
export class PackageRepository extends EntityRepository<PackageDocument> {
  constructor(
    @InjectModel(Package.name)
    private readonly packageModel: Model<PackageDocument>,
  ) {
    super(packageModel);
  }

  async findPendingPackages(page?: number, limit?: number): Promise<Package[]> {
    return await this.find(
      {
        $and: [
          {
            $or: [{ status: PackageStatus.New }],
          },
          {
            deliveredBy: null,
          },
        ],
      },
      page,
      limit,
    );
  }

  async getPackageById(_id: Types.ObjectId): Promise<Package> {
    return await this.findOne({ _id });
  }

  async findPendingPackageById(_id: Types.ObjectId): Promise<Package> {
    const packages = await this.packageModel.findOne({
      $and: [
        { _id },
        {
          $or: [{ status: PackageStatus.New }],
        },
        {
          deliveredBy: { $eq: null },
        },
      ],
    });

    if (!packages)
      throw new BadRequestException(
        'El paquete no se encuentra o ya tiene un repartidor asignado.',
      );

    return packages;
  }
}
