// @ts-check

export class logger {
    
 async logStep(step: string) {
  console.log(`🪜 ${new Date().toISOString()} | ${step}`);
 }

}