import type {Meta, StoryObj, ArgTypes} from '@storybook/vue3'

import {fn, within, userEvent,expect} from '@storybook/test'

import { PlButton, PlButtonGroup } from 'play-element'

type Story = StoryObj<typeof PlButton> & {
  argTypes?: ArgTypes
}


const meta: Meta<typeof PlButton> = {
  title: "Example/Button",
  component: PlButton,
  tags: ["autodocs"],
  subcomponents: { ButtonGroup: PlButtonGroup },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "danger", "info", ""],
    },
    size: {
      control: { type: "select" },
      options: ["large", "default", "small", ""],
    },
    disabled: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
    useThrottle: {
      control: "boolean",
    },
    throttleDuration: {
      control: "number",
    },
    autofocus: {
      control: "boolean",
    },
    tag: {
      control: { type: "select" },
      options: ["button", "a", "div"],
    },
    nativeType: {
      control: { type: "select" },
      options: ["button", "submit", "reset", ""],
    },
    icon: {
      control: { type: "text" },
    },
    loadingIcon: {
      control: { type: "text" },
    },
  },
  args: { onClick: fn() },
};


const container = (val: string) => `
<div style="margin:5px">
  ${val}
</div>
`;

export const Default: Story & { args: { content: string } } = {
  argTypes: {
    content: {
      control: { type: "text" },
    },
  },
  args: {
    type: "primary",
    content: "Button",
  },
  render: (args) => ({
    components: { PlButton },
    setup() {
      return { args };
    },
    template: container(
      `<pl-button v-bind="args">{{args.content}}</pl-button>`
    ),
  }),
};

export const Group: Story & { args: { content1: string; content2: string } } = {
  argTypes: {
    groupType: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "danger", "info", ""],
    },
    groupSize: {
      control: { type: "select" },
      options: ["large", "default", "small", ""],
    },
    groupDisabled: {
      control: "boolean",
    },
    content1: {
      control: { type: "text" },
      defaultValue: "Button1",
    },
    content2: {
      control: { type: "text" },
      defaultValue: "Button2",
    },
  },
  args: {
    round: true,
    content1: "Button1",
    content2: "Button2",
  },
  render: (args) => ({
    components: {PlButton, PlButtonGroup },
    setup() {
      return { args };
    },
    template: container(`
       <pl-button-group :type="args.groupType" :size="args.groupSize" :disabled="args.groupDisabled">
         <pl-button v-bind="args">{{args.content1}}</pl-button>
         <pl-button v-bind="args">{{args.content2}}</pl-button>
       </pl-button-group>
    `),
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    await step("click btn1", async () => {
      await userEvent.click(canvas.getByText("Button1"));
    });
    await step("click btn2", async () => {
      await userEvent.click(canvas.getByText("Button2"));
    });
    expect(args.onClick).toHaveBeenCalled();
  },
};


export default meta