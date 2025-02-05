import { Column, Row } from '@react-email/components';
import { Link } from 'src/components/Link';
import { ShadowText } from 'src/components/ShadowText';

export const Footer = () => {
  return (
    <>
      <Row>
        <Column>
          <ShadowText>
            <Link
              href="https://twenty.com/"
              value="Website"
              aria-label="Visit Aston's website"
            />
          </ShadowText>
        </Column>
        <Column>
          <ShadowText>
            <Link
              href="https://github.com/Brandedwithhonor/Aston"
              value="Github"
              aria-label="Visit Aston's GitHub repository"
            />
          </ShadowText>
        </Column>
        <Column>
          <ShadowText>
            <Link
              href="https://twenty.com/user-guide"
              value="User guide"
              aria-label="Read Aston's user guide"
            />
          </ShadowText>
        </Column>
        <Column>
          <ShadowText>
            <Link
              href="https://docs.twenty.com/"
              value="Developers"
              aria-label="Visit Aston's developer documentation"
            />
          </ShadowText>
        </Column>
      </Row>
      <ShadowText>
        Aston.com Public Benefit Corporation
        <br />
        2261 Market Street #5275
        <br />
        San Francisco, CA 94114
      </ShadowText>
    </>
  );
};
