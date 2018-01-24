import { colors } from '../common/colors';

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
        settingsKey="themeColor"
        colors={colors}
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