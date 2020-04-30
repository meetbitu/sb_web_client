import mixpanel from 'mixpanel-browser';
mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN);

const env_check = process.env.REACT_APP_MIXPANEL_ACTIVE;

const Mixpanel = {
  identify: (id) => {
    if (env_check) mixpanel.identify(id);
  },
  alias: (id) => {
    if (env_check) mixpanel.alias(id);
  },
  track: (name, props) => {
    if (env_check) mixpanel.track(name, props);
  },
  people: {
    set: (props) => {
      if (env_check) mixpanel.people.set(props);
    },
  },
};

export default Mixpanel;
