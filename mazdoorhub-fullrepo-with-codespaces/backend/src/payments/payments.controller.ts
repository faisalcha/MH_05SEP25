import { Body, Controller, Headers, Post, Req, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { AuthGuard } from '../auth';

@Controller('v1/payments')
export class PaymentsController {
  constructor(private svc: PaymentsService) {}

  @Post('initiate')
  @UseGuards(AuthGuard)
  initiate(@Req() req, @Body() dto: { jobId: string; amountPkr: number; method: 'jazzcash'|'easypaisa' }) {
    return this.svc.initiate(dto, req.userId || 'EMP');
  }

  @Post('webhook/jazzcash')
  jazz(@Headers('x-signature') sig: string, @Body() body: any) { return this.svc.handleWebhook('jazzcash', sig, body); }

  @Post('webhook/easypaisa')
  easy(@Headers('x-signature') sig: string, @Body() body: any) { return this.svc.handleWebhook('easypaisa', sig, body); }
}
