describe('경매 수정', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/auctions/pre-auction/edit/10');
    cy.findByText('사전 경매 수정하기').should('exist');
  });

  it('최소 사진 1장이 있고, 제목, 시작가, 카테고리가 입력되어 있다.', () => {
    cy.findAllByAltText(/상품 사진/).should('have.length.greaterThan', 0);
    cy.findByLabelText(/제목/).should('have.value', '[뉴발란스] 993');
    cy.findByRole('combobox', { name: /카테고리/ }).contains('패션 및 의류');
    cy.findByLabelText(/시작 가격/).should('have.value', '230,000원');
  });

  it.only('수정 완료 버튼 클릭하면 홈으로 이동한다.', () => {
    cy.findByLabelText('수정 완료 버튼').click();
    cy.findByText('사전 경매가 수정되었습니다.').should('be.visible');
  });
});
