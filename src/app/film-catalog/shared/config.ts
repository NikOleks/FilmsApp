import {InjectionToken} from '@angular/core';
import { ConfigService } from './config.service';

const apiUrl: string = "https://api.themoviedb.org/3";
const apiKey: string = '0994e7679a856150aadcecf7de489bce';
const imgPath: string = 'https://image.tmdb.org/t/p';

export const requestConfig = {
    movieUrl: `${apiUrl}/movie`,
    searchUrl: `${apiUrl}/search`,
    personUrl: `${apiUrl}/person`,
    params: `&api_key=${apiKey}&language=ru-RU`,
  
    midImgPath: `${imgPath}/w500`,
    smallImgPath: `${imgPath}/w185`,
    bigBackPath: `${imgPath}/w1280`,
    midBackPath: `${imgPath}/w780`,
    smallBackPath: `${imgPath}/w300`
};

export const REQUEST_CONFIG = new InjectionToken<ConfigService>('');