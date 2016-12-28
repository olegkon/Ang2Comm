import { Ang2commPage } from './app.po';

describe('ang2comm App', function() {
  let page: Ang2commPage;

  beforeEach(() => {
    page = new Ang2commPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
