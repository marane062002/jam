import { HttpParams } from '@angular/common/http';
export const createRequestOption = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();

  if (req) {
    Object.keys(req).forEach(key => {
      if (key !== 'sort') {
        if(key == 'criteria'){
          if (req.criteria && req.criteria.length > 0) {
            req.criteria.forEach((criterion: any) => {
              options = options.set(criterion.key, criterion.value);
            });
        }

        }else{
          options = options.set(key, req[key]);
        }
      }
    });

    if (req.sort) {
      req.sort.forEach((val: string) => {
        options = options.append('sort', val);
      });
    }
  }

  return options;
};