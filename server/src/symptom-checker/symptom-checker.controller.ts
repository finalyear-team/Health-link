import { Controller } from '@nestjs/common';
import { SymptomCheckerService } from './symptom-checker.service';

@Controller('symptom-checker')
export class SymptomCheckerController {
  constructor(private readonly symptomCheckerService: SymptomCheckerService) {}
}
