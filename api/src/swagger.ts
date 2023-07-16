import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerTheme } from 'swagger-themes';

export const config = new DocumentBuilder()
  .setTitle('Blogy API')
  .setVersion('1.0')
  .build();

const theme = new SwaggerTheme('v3');
export const options = {
  customCss: theme.getBuffer('flattop'),
  customSiteTitle: 'Blogy API',
};
