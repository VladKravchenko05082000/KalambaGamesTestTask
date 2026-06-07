import type { FC } from "react";

export const SettingsForm: FC = () => {
  return (
    <form>
      <fieldset>
        <fieldset className="form-group">
          <input className="form-control" type="text" placeholder="URL of profile picture" />
        </fieldset>
        <fieldset className="form-group">
          <input className="form-control form-control-lg" type="text" placeholder="Your Name" />
        </fieldset>
        <fieldset className="form-group">
          <textarea className="form-control form-control-lg" rows={8} placeholder="Short bio about you" />
        </fieldset>
        <fieldset className="form-group">
          <input className="form-control form-control-lg" type="text" placeholder="Email" />
        </fieldset>
        <fieldset className="form-group">
          <input className="form-control form-control-lg" type="password" placeholder="Password" />
        </fieldset>
        <button className="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
      </fieldset>
    </form>
  );
};
