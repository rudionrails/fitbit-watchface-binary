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
  </Page>
);

registerSettingsPage(page);