import { Form, Select } from 'antd';
import _ from 'lodash';
import React from 'react';
import { FileSubmission } from 'postybirb-commons';
import { Submission } from 'postybirb-commons';
import { NewTumblBlog } from 'postybirb-commons';
import {
  NewTumblFileOptions,
  NewTumblNotificationOptions
} from 'postybirb-commons';
import WebsiteService from '../../services/website.service';
import { SubmissionType, SubmissionRating } from 'postybirb-commons';
import { GenericDefaultFileOptions } from '../../shared/objects/generic-default-file-options';
import { GenericDefaultNotificationOptions } from '../../shared/objects/generic-default-notification-options';
import { WebsiteSectionProps } from '../form-sections/website-form-section.interface';
import GenericFileSubmissionSection from '../generic/GenericFileSubmissionSection';
import { GenericLoginDialog } from '../generic/GenericLoginDialog';
import { GenericSelectProps } from '../generic/GenericSelectProps';
import GenericSubmissionSection from '../generic/GenericSubmissionSection';
import { LoginDialogProps, Website } from '../interfaces/website.interface';

const defaultFileOptions: NewTumblFileOptions = {
  ...GenericDefaultFileOptions,
  blog: ''
};

const defaultNotificationOptions: NewTumblNotificationOptions = {
  ...GenericDefaultNotificationOptions,
  blog: ''
};

export class NewTumbl implements Website {
  internalName: string = 'NewTumbl';
  name: string = 'newTumbl';
  supportsAdditionalFiles: boolean = true;
  supportsTags: boolean = true;
  LoginDialog = (props: LoginDialogProps) => (
    <GenericLoginDialog url="https://newtumbl.com/" {...props} />
  );

  FileSubmissionForm = (props: WebsiteSectionProps<FileSubmission, NewTumblFileOptions>) => (
    <NewTumblFileSubmissionForm
      key={props.part.accountId}
      hideThumbnailOptions={true}
      ratingOptions={{
        show: true,
        ratings: [
          {
            value: SubmissionRating.GENERAL,
            name: 'F'
          },
          {
            value: '2',
            name: 'O'
          },
          {
            value: SubmissionRating.MATURE,
            name: 'M'
          },
          {
            value: SubmissionRating.ADULT,
            name: 'X'
          },
          {
            value: SubmissionRating.EXTREME,
            name: 'W'
          }
        ]
      }}
      {...props}
    />
  );

  NotificationSubmissionForm = (
    props: WebsiteSectionProps<Submission, NewTumblNotificationOptions>
  ) => (
    <NewTumblNotificationSubmissionForm
      key={props.part.accountId}
      {...props}
      ratingOptions={{
        show: true,
        ratings: [
          {
            value: SubmissionRating.GENERAL,
            name: 'F'
          },
          {
            value: '2',
            name: 'O'
          },
          {
            value: SubmissionRating.MATURE,
            name: 'M'
          },
          {
            value: SubmissionRating.ADULT,
            name: 'X'
          },
          {
            value: SubmissionRating.EXTREME,
            name: 'W'
          }
        ]
      }}
    />
  );

  getDefaults(type: SubmissionType) {
    return _.cloneDeep(
      type === SubmissionType.FILE ? defaultFileOptions : defaultNotificationOptions
    );
  }
}

interface NewTumblSubmissionState {
  blogs: NewTumblBlog[];
}

export class NewTumblNotificationSubmissionForm extends GenericSubmissionSection<
  NewTumblNotificationOptions
> {
  state: NewTumblSubmissionState = {
    blogs: []
  };

  constructor(props: WebsiteSectionProps<FileSubmission, NewTumblNotificationOptions>) {
    super(props);
    this.state = {
      blogs: []
    };

    WebsiteService.getAccountInformation(
      this.props.part.website,
      this.props.part.accountId,
      'blogs'
    ).then(({ data }) => {
      if (data) {
        this.setState({ blogs: data });
      }
    });
  }

  renderRightForm(data: NewTumblNotificationOptions) {
    const elements = super.renderRightForm(data);
    elements.push(
      <Form.Item label="Blog">
        <Select
          {...GenericSelectProps}
          className="w-full"
          value={data.blog}
          onSelect={this.setValue.bind(this, 'blog')}
        >
          {this.state.blogs.map(b => (
            <Select.Option value={b.id}>{b.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
    );
    return elements;
  }
}

export class NewTumblFileSubmissionForm extends GenericFileSubmissionSection<NewTumblFileOptions> {
  state: NewTumblSubmissionState = {
    blogs: []
  };

  constructor(props: WebsiteSectionProps<FileSubmission, NewTumblFileOptions>) {
    super(props);
    this.state = {
      blogs: []
    };

    WebsiteService.getAccountInformation(
      this.props.part.website,
      this.props.part.accountId,
      'blogs'
    ).then(({ data }) => {
      if (data) {
        this.setState({ blogs: data });
        if (!this.props.part.data.blog) {
          this.setValue('blog', data.find(b => b.primary).id);
        }
      }
    });
  }

  renderRightForm(data: NewTumblFileOptions) {
    const elements = super.renderRightForm(data);
    elements.push(
      <Form.Item label="Blog">
        <Select
          {...GenericSelectProps}
          className="w-full"
          value={data.blog}
          onSelect={this.setValue.bind(this, 'blog')}
        >
          {this.state.blogs.map(b => (
            <Select.Option value={b.id}>{b.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
    );
    return elements;
  }
}