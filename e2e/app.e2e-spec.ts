import { MinicrmAddinNgPage } from './app.po';

describe('minicrm-addin-ng App', () => {
  let page: MinicrmAddinNgPage;

  beforeEach(() => {
    page = new MinicrmAddinNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
