import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsLocale, Length, MinLength,  } from 'class-validator';

export class CreateProjectMemberDto {
  @ApiProperty({ type: 'string', example: 'John Dou' })
  @Length(5, 100, { message: 'Must have from 5 to 100 chars' })
  name: string;

  @ApiProperty({ type: 'string', example: 'Johndou' })
  @Length(5, 30, { message: 'Must have from 5 to 30 chars' })
  username: string;

  @ApiProperty({ type: 'string', example: 'test@email.com' })
  @IsEmail(null, { message: 'Non valid email' })
  email: string;

  @ApiProperty({ type: 'string', example: 'testpass' })
  @MinLength(8, { message: 'Must include atleast 8 chars' })
  password: string;

  @ApiProperty({ type: 'string', example: 'en_EN' })
  @IsLocale({ message: 'Non valid locale' })
  locale: string;
}

email -> send token

// @IsNotEmpty()
// @IsString({ message: 'Must be a string' })
// emailToken: string;
// b4db61c5-d10e-4ed3-a903-b8fd75fc3d30

token(email) ? (validate token ? save user : Error) : send email




email token invite(email conf, + role)
sso(email conf)
email conf

// после успешного входа пользователя отправьте токен идентификатора пользователя
// на ваш сервер с помощью HTTPS. Затем на сервере проверьте целостность маркера 
// ID и используйте информацию о пользователе, содержащуюся в маркере, 
// для установления сеанса или создания новой учетной записи.
// https://oauth2.googleapis.com/tokeninfo?id_token=XYZ123

// {
//   // These six fields are included in all Google ID Tokens.
//   "iss": "https://accounts.google.com",
//   "sub": "110169484474386276334",
//   "azp": "1008719970978-hb24n2dstb40o45d4feuo2ukqmcc6381.apps.googleusercontent.com",
//   "aud": "1008719970978-hb24n2dstb40o45d4feuo2ukqmcc6381.apps.googleusercontent.com",
//   "iat": "1433978353",
//   "exp": "1433981953",
 
//   // These seven fields are only included when the user has granted the "profile" and
//   // "email" OAuth scopes to the application.
//   "email": "testuser@gmail.com",
//   "email_verified": "true",
//   "name" : "Test User",
//   "picture": "https://lh4.googleusercontent.com/-kYgzyAWpZzJ/ABCDEFGHI/AAAJKLMNOP/tIXL9Ir44LE/s99-c/photo.jpg",
//   "given_name": "Test",
//   "family_name": "User",
//   "locale": "en"
//  }

// После того, как вы проверили токен, проверьте, есть ли пользователь уже в вашей
// базе данных пользователей. Если это так, установите аутентифицированный сеанс для
// пользователя. Если пользователя еще нет в вашей базе данных пользователей,
// создайте новую запись о пользователе на основе информации в полезной нагрузке
// маркера идентификатора и установите сеанс для пользователя. Вы можете запросить
// у пользователя любую дополнительную информацию о профиле, которая вам требуется,
// когда вы обнаружите вновь созданного пользователя в своем приложении.




// @IsNotEmpty()
// @IsString({ message: 'Must be a string' })
// emailToken: string;

// @ApiProperty({ type: 'string', example: 'user info', required: false })
// @IsOptional()
// @MinLength(1, { message: 'Empty description' })
// bio?: string;

// @ApiProperty({
//   type: Map,
//   example: {
//     author: 'Rudyard Kipling',
//     year: '1894',
//   },
// })
// @IsInstance(Map)
// @IsString({ each: true })
// specifications: Map<string, any>;

// @ApiProperty({
//   type: 'string',
//   example: 'https://path-to-file-preview-1.png',
//   isArray: true,
//   required: false,
// })
// @IsOptional()
// @IsArray({ message: 'Must be an array' })
// @ArrayMaxSize(4, { message: 'Must includes 4 assets at max' })
// @IsUrl({ message: 'Not valid url', each: true })
// assets?: string[];

// @ApiProperty({
//   enum: ExtraNotificationMethod,
//   example: ExtraNotificationMethod.EMAIL,
//   required: false,
// })
// @IsOptional()
// @IsEnum(ExtraNotificationMethod, {
//   message: 'Must be an ExtraNotificationMethod enum',
// })
// extraNotificationMethod?: ExtraNotificationMethod;
