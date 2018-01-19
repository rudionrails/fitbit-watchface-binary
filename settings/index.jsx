const themeColors = [
  { color: 'tomato' },
  { color: 'sandybrown' },
  { color: 'gold' },
  { color: 'aquamarine' },
  { color: 'deepskyblue' },
  { color: 'plum' },
  { color: 'deeppink'},
];

const page = (props) => (
  <Page>
    <Section title="General Settings">
      <Toggle
        settingsKey="isDigitalClockEnabled"
        label="Noob Mode? (show digital clock)"
      />
      <Toggle
        settingsKey="isDisplayAlwaysOn"
        label="Always on? (don't switch off display)"
      />
    </Section>
    
    <Section title="Color Settings">
      <ColorSelect
        settingsKey="themeColor"
        colors={themeColors}
      />
    </Section>
  </Page>
);

registerSettingsPage(page);