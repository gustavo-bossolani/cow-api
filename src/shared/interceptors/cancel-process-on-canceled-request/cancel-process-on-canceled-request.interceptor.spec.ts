import { CancelProcessOnCanceledRequestInterceptor } from './cancel-process-on-canceled-request.interceptor';

describe('CancelProcessOnCanceledRequestInterceptor', () => {
  it('should be defined', () => {
    expect(new CancelProcessOnCanceledRequestInterceptor()).toBeDefined();
  });
});
