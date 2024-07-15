import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { MessageData } from './message.data';
import { MessageDto, TagMessageDto } from './models/message.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageData: MessageData) {}

  @Post()
  async create(@Body() createMessageDto: MessageDto) {
    return this.messageData.create(createMessageDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.messageData.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMessageDto: MessageDto) {
    return this.messageData.update(id, updateMessageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.messageData.remove(id);
  }

  @Patch(':id/tag')
  async tagMessage(@Param('id') id: string, @Body() tagMessageDto: TagMessageDto) {
    return this.messageData.addTag(new ObjectID(id), tagMessageDto.tag);
  }

  @Patch(':id/untag')
  async untagMessage(@Param('id') id: string, @Body() tagMessageDto: TagMessageDto) {
    return this.messageData.removeTag(new ObjectID(id), tagMessageDto.tag);
  }

  @Get('tag/:tag')
  async getMessagesByTag(@Param('tag') tag: string) {
    return this.messageData.getMessagesByTag(tag);
  }
}
