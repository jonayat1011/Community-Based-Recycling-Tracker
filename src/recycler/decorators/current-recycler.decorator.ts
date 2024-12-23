// src/common/decorators/current-recycler.decorator.ts

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Create a custom parameter decorator to extract 'recycler' from the request
export const CurrentRecycler = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.recycler;  // assuming 'recycler' is attached to the request object
  },
);
