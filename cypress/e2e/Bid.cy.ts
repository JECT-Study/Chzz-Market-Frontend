describe('입찰', () => {
  beforeEach(() => {
    cy.login();
  });

  it('입찰 기록이 없을 경우, 나의 참여 금액이 존재하지 않는다.', () => {
    cy.visit('/auctions/bid/0');
    cy.wait(1000);
    cy.findByLabelText('나의 참여 금액').should('not.exist');
  });

  it('입찰 기록이 있을 경우, 나의 참여 금액이 존재한다.', () => {
    cy.visit('/auctions/bid/3');
    cy.wait(1000);
    cy.findByLabelText('나의 참여 금액').should('exist');
  });

  it('체크 박스 클릭하지 않으면 제안하기 클릭할 수 없고, 체크해야 클릭할 수 있다.', () => {
    cy.visit('/auctions/bid/0');
    cy.wait(1000);

    const btn = cy.findByLabelText('제안하기');
    btn.should('be.disabled');

    cy.findByLabelText('체크박스').click();
    cy.wait(100);
    btn.should('be.enabled');
  });

  it('입찰 기록이 있을 경우 시작가, 입찰가 보다 낮은 금액 또는 200만원 이상을 입력하면 경고문이 나타난다.', () => {
    cy.visit('/auctions/bid/3');
    cy.wait(1000);

    const btn = cy.findByLabelText('수정하기');
    const costInput = cy.findByLabelText(/가격 제안하기/);

    costInput.type('200000');
    cy.findByLabelText('체크박스').click();
    cy.wait(100);

    btn.click();
    cy.findByText(/시작가보다 높은 금액/).should('exist');

    costInput.clear();
    costInput.type('350000');
    btn.click();
    cy.findByText(/현재 참여 금액과 다른 금액/).should('exist');

    costInput.clear();
    costInput.type('2500000');
    btn.click();
    cy.findByText(/2,000,000원 이하/).should('exist');
  });

  it.only('입찰하면 상세 조회 페이지로 이동하고 나의 참여 금액이 나타난다.', () => {
    cy.visit('/auctions/bid/3');
    cy.wait(1000);

    cy.findByLabelText(/가격 제안하기/).type('360000');

    cy.findByLabelText('체크박스').click();
    cy.wait(100);

    cy.findByLabelText('수정하기').click();
    cy.findByText('입찰 성공!');
  });
});
