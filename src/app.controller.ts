import { CACHE_MANAGER, Controller, Get, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { AppService } from './app.service';

@Controller()
export class AppController {
  myString: string = "livrodjx"
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Get("simple-string-fetch")
  async getSimpleString() {
    let value = await this.cacheManager.get('my-string')

    if(value) {
      return {
        data: value,
        loadsFrom: 'redis cache'
      }
    }

    await this.cacheManager.set('my-string', this.myString, {ttl: 300})

    return {
      data: this.myString,
      loadsFrom: 'fake database'
    }
  }
}
