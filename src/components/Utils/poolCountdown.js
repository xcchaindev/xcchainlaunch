import Countdown from "react-countdown";
import * as s from "../../styles/global";
const PoolCountdown = ({ start, end }) => {
  const dateNow = (parseInt(Date.now() / 1000));
  const isStarted = parseInt(start) < dateNow;
  const hasEnded = parseInt(end) < dateNow;

  if (hasEnded) {
    return null;
  }
  /* Count down renderer */
  const countDownRenderer = (opts) => {
    const { days, hours, minutes, seconds, completed } = opts
    if (completed) {
      // Render a completed state
      return (
        <div className="countdown d-flex">
          <span className="countdown-value days-bottom">{`...`}</span>
        </div>
      )
    } else {
      return (
        <div className="countdown d-flex">
          {(days > 0) && (
            <div className="countdown-container days">
              <span className="countdown-value days-bottom">{days}</span>
              <span className="countdown-heading days-top">d</span>
            </div>
          )}
          {(hours > 0) && (
            <div className="countdown-container hours">
            <span className="countdown-value hours-bottom">{hours}</span>
              <span className="countdown-heading hours-top">h</span>
            </div>
          )}
          <div className="countdown-container minutes">
            <span className="countdown-value minutes-bottom">{minutes}</span>
            <span className="countdown-heading minutes-top">m</span>
          </div>
          <div className="countdown-container seconds">
            <span className="countdown-value seconds-bottom">{seconds}</span>
            <span className="countdown-heading seconds-top">s</span>
          </div>
        </div>
      )
    }
  }
  /* ------------------- */

  return (
    <s.Container fd="row" jc="space-between">
      <s.TextID>
        {isStarted ? "End in" : "Start in"}
      </s.TextID>
      <Countdown
        renderer={countDownRenderer}
        date={
          isStarted
            ? parseInt(end) * 1000
            : parseInt(start) * 1000
        }
      />
    </s.Container>
  );
};
export default PoolCountdown;
