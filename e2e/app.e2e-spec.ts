import { GulfPondBrewingPage } from './app.po';

describe('gulf-pond-brewing App', () => {
  let page: GulfPondBrewingPage;

  beforeEach(() => {
    page = new GulfPondBrewingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
