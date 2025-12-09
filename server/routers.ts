import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  
  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(2).max(50),
          email: z.string().email(),
          message: z.string().min(10).max(500),
        })
      )
      .mutation(async ({ input }) => {
        // Log the contact form submission
        console.log('Contact form submission:', {
          name: input.name,
          email: input.email,
          message: input.message,
          timestamp: new Date().toISOString(),
        });
        
        // TODO: Implement email sending or database storage
        // For now, we just log the submission
        // You can integrate with services like SendGrid, AWS SES, or save to database
        
        return {
          success: true,
          message: 'Contact form received successfully',
        };
      }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
