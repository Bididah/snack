import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GenericController } from 'util/generic.controller';
import { Product } from './entities';

@Controller('products')
export class ProductsController extends GenericController<Product> {
  constructor(private readonly productsService: ProductsService) {
    super(productsService);
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return super.create(createProductDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return super.update(id, updateProductDto);
  }
}
