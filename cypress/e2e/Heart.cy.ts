describe('찜 목록', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/heart');
  });

  it('찜 목록을 클릭하면 해당 상품 상세 조회 페이지로 이동한다.', () => {
    cy.findByLabelText('0_내가 찜 한 사전 경매 상품').click();
    cy.url().should('include', '/auctions/pre-auction/11');
  });

  it('찜 목록 제외 버튼을 클릭하면 목록에서 사라진다.', () => {
    cy.findByLabelText('0_찜 목록에서 제외').click();
    cy.findByLabelText('0_내가 찜 한 사전 경매 상품').should('not.exist');
  });

  it('찜 목록에 하나도 없으면 관심 있는 사전 경매가 없어요 문구가 나온다.', () => {
    cy.findByLabelText('0_찜 목록에서 제외').click();
    cy.findByText('관심 있는 사전 경매가 없어요.');
  });
});
