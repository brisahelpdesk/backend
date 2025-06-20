import { Controller, Get, Redirect } from "@nestjs/common";
import { AppService } from './app.service';
import { ApiResponse } from "@nestjs/swagger";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @Redirect('https://brisahelpdesk.github.io', 302)
    @ApiResponse({ status: 302, description: 'Redireciona para página de documentação do projeto.'})
    app(): void {}
}
