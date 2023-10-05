import { Controller } from '@nestjs/common';
import { EntriesService } from './entries.service';

@Controller()
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}
}
