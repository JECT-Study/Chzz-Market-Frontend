describe('경매 종료', () => {
  beforeEach(() => {
    cy.login();
  });

  context('등록자', () => {
    it('경매가 끝나면 시간이 경매 종료로 변경된다.', () => {
      cy.visit('/auctions/auction/1');
      cy.wait(1500);
      cy.findByText('경매 종료').should('exist');
    });

    it('경매가 끝나고 입찰자가 있으면, 내가 등록한 경매 버튼이 참여자 내역 보기 버튼으로 변경되고, 클릭하면 참여자 내역 페이지로 이동한다.', () => {
      cy.visit('/auctions/auction/6');
      cy.findByLabelText('참여자 내역 보기').should('exist').click();

      cy.url().should('include', '/auctions/6/bidder-list');
      cy.findByText('경매 참여자 목록').should('exist');
    });

    it('경매가 끝나고 입찰자가 없으면, 내가 등록한 경매 버튼이 참여자 내역 보기 버튼으로 변경되지만 클릭하지 못한다.', () => {
      cy.visit('/auctions/auction/5');
      cy.findByLabelText('참여자 내역 보기').should('exist').and('be.disabled');
    });
  });

  context('비등록자', () => {
    it('입찰하지 않았거나 낙찰받지 못한 경우, 종료된 경매 버튼으로 변경되고 클릭하지 못한다.', () => {
      cy.visit('/auctions/auction/7');
      cy.findByLabelText('종료된 경매').should('exist').and('be.disabled');
    });

    it('낙찰된 경우, 결제하기 버튼으로 변경되고 클릭하면 결제 페이지로 이동한다.', () => {
      cy.visit('/auctions/auction/8');
      cy.findByLabelText('결제하기').should('exist');
    });

    it('낙찰되어 결제한 경우, 결제 내역 보기 버튼으로 변경되고 클릭하면 결제 내역 페이지로 이동한다.', () => {
      cy.visit('/auctions/auction/9');
      cy.findByLabelText('결제 내역 보기').should('exist');
    });
  });
});
