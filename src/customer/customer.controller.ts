import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { GenericController } from 'util/generic.controller';
import { Customer } from './entities';

@Controller('customers')
export class CustomerController extends GenericController<Customer> {
  constructor(private readonly customerService: CustomerService) {
    super(customerService);
  }

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(updateCustomerDto, {
      where: { id: +id },
    });
  }
}
