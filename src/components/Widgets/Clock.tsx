import React, { Component } from 'react';
import { getCountryDatetime } from '../../utils/functions';

interface Props {
  lang: string;
  timeZone: string;
}

interface State {
  datetime: string;
}

class Clock extends Component<Props, State> {
  intervalId: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      datetime: getCountryDatetime(props.lang, props.timeZone),
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  tick = () => {
    const { lang, timeZone } = this.props;
    this.setState({
      datetime: getCountryDatetime(lang, timeZone),
    });
  };

  render() {
    const { datetime } = this.state;
    return <span>{datetime}</span>;
  }
}

export default Clock;
