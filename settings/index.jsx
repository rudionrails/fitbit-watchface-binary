import { colors, opacities } from '../common/utils';

const page = (props) => (
  <Page>
    <Section title="General Settings">
      <Toggle
        settingsKey="isDigitalClockDisabled"
        label="Nerd Mode? (hide digital clock)"
      />
      <Toggle
        settingsKey="isDisplayAlwaysOn"
        label="Always on? (don't switch off display)"
      />
    </Section>

    <Section title="Color Settings">
      <ColorSelect
        settingsKey="binaryClockColor"
        colors={colors}
      />
      <Select
        label="Background Opacity"
        settingsKey="binaryClockShadowOpacity"
        options={opacities}
        onSelect={(selection) => console.log(`onSelect ${JSON.stringify(selection)}`)}
      />
    </Section>

    <Section title="Reset defaults">
      <Button
        label="Click here"
        settingsKey="clear"
        onClick={() => props.settingsStorage.clear()}
      />
    </Section>
  </Page>
);

registerSettingsPage(page);