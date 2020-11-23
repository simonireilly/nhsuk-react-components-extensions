import React from 'react';
import { shallow } from 'enzyme';
import Timeline from '../Timeline';
import Event from '../components/Event';
import Tag from '../../tag/Tag';

const actionLinkText = 'Cancel';
const eventInstigator = 'System';

const testEvents = [
  {
    title: <>Result sent</>,
    instigator: <>{eventInstigator}</>,
    date: new Date('2019-11-19 19:49:10'),
    description: [
      <>Test Result: (39S) Low-grade dyskaryosis, HPV positive, Repeat Advised</>,
      <>Test Date: 19-Oct-2020, 9:00:00 am</>,
    ],
    action: (
      <span className="nhsuk-timeline__action">
        -
        <Tag className="nhsuk-timeline__tag" color="yellow">
          Send to printer
        </Tag>
        <a className="nhsuk-timeline__link" href="/placeholder/">
          Cancel
        </a>
      </span>
    ),
  },
  {
    title: <>Patient deferred</>,
    instigator: <>James Smith</>,
    date: new Date('2019-11-19 16:28:57'),
    description: [
      <>Defer Reason: Pregnancy</>,
      <>CRM Case Number: CAS-12345-ABCDE</>,
      <>Comments: Requested via the GP form</>,
    ],
  },
  {
    title: <>Screening invitation sent</>,
    instigator: <>System</>,
    date: new Date('2019-11-18 19:49:10'),
    action: (
      <span className="nhsuk-timeline__action">
        -
        <Tag className="nhsuk-timeline__tag" color="grey">
          Sent to patient
        </Tag>
        <a className="nhsuk-timeline__link" href="/placeholder2">
          Resend
        </a>
      </span>
    ),
  },
];

describe('Timeline', () => {
  it('matches snapshot', () => {
    const timeline = shallow(<Timeline events={testEvents} />);

    expect(timeline).toMatchSnapshot();

    timeline.unmount();
  });

  it('should have correct classes applied', () => {
    const timeline = shallow(<Timeline events={testEvents} />);

    expect(timeline.hasClass('nhsuk-timeline')).toBeTruthy();

    timeline.unmount();
  });

  describe('Event', () => {
    it('matches snapshot', () => {
      const event = shallow(<Event {...testEvents[0]} />);

      expect(event).toMatchSnapshot();

      event.unmount();
    });

    it('should have correct classes applied', () => {
      const event = shallow(<Event {...testEvents[0]} />);

      expect(event.hasClass('nhsuk-timeline__event')).toBeTruthy();

      event.unmount();
    });

    it('should have correct title', () => {
      const event = shallow(<Event {...testEvents[1]} />);

      expect(event.find('.nhsuk-timeline__title').text()).toBe('Patient deferred by James Smith');

      event.unmount();
    });

    it('should have correct instigator', () => {
      const event = shallow(<Event {...testEvents[0]} />);

      expect(event.find('.nhsuk-timeline__by').text()).toBe(` by ${eventInstigator}`);

      event.unmount();
    });

    it('should have correct date', () => {
      const event = shallow(<Event {...testEvents[0]} />);

      const dateOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      };

      expect(event.find('.nhsuk-timeline__date time').text()).toBe(
        testEvents[0].date.toLocaleString('en-GB', dateOptions),
      );

      event.unmount();
    });

    it('has correct description items if description data is present', () => {
      const event = shallow(<Event {...testEvents[0]} />);

      expect(event.find('.nhsuk-timeline__description-item').exists()).toBeTruthy();
    });

    it('has no description items if description data is not present', () => {
      const event = shallow(<Event {...testEvents[2]} />);

      expect(event.find('.nhsuk-timeline__description-item').exists()).toBeFalsy();
    });

    it('has correct link text if action data is present', () => {
      const event = shallow(<Event {...testEvents[0]} />);

      expect(event.find('.nhsuk-timeline__link').text()).toBe(actionLinkText);
    });

    it('will show action if action data present', () => {
      const event = shallow(<Event {...testEvents[0]} />);

      expect(event.find('.nhsuk-timeline__action').exists()).toBeTruthy();
    });

    it('will not show action if no action data present', () => {
      const event = shallow(<Event {...testEvents[1]} />);

      expect(event.find('.nhsuk-timeline__action').exists()).toBeFalsy();
    });
  });
});
