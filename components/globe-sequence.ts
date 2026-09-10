const clamp = (value:number) => Math.max(0, Math.min(1,value));
const range = (progress:number,start:number,end:number) => clamp((progress-start)/(end-start));
const ease = (value:number) => value < .5 ? 2*value*value : 1-Math.pow(-2*value+2,2)/2;

/** All layers follow chapter progress, so reverse scrubbing retraces the same path. */
export function globeSequence(progress:number) {
  return {
    descent:range(progress,0,.16),
    pullback:range(progress,.16,.32),
    turn:ease(range(progress,.46,.78)),
  };
}

/** Routes finish before the turn; each city lights only after its line arrives. */
export function globeConnection(progress:number,index:number) {
  const start=.16+index*.010;
  return { trace:range(progress,start,start+.14), arrival:range(progress,start+.14,start+.17) };
}
