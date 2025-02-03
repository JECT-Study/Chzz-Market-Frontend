describe('알림', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/notification');
  });

  it('읽은 알림과 읽지 않은 알림은 배경색으로 차이를 두며, 읽지 않은 알림을 클릭하면 읽음 표시한다.', () => {
    const unreadNotification = cy
      .findAllByLabelText(/알림/)
      .filter('.bg-notificationBgColor')
      .first();
    unreadNotification.click();
    cy.wait(500);

    unreadNotification.should('not.have.class', 'bg-notificationBgColor');
  });

  it('읽지 않은 알림이 있으면 네비게이션에 빨간 점으로 표시하고 다 읽으면 사라진다.', () => {
    const unreadDot = cy.findByLabelText('읽지 않음 표시');
    unreadDot.should('exist');

    const unreadNotification = cy
      .findAllByLabelText(/알림/)
      .filter('.bg-notificationBgColor')
      .first();

    unreadNotification.click();
    cy.wait(1000);

    unreadDot.should('not.exist');
  });

  it('특정 알림 클릭하면 알림 관련 페이지로 이동한다.', () => {
    cy.findByLabelText('알림_0').click();
    cy.url().should('include', '/auctions/auction/10');
  });

  it('알림을 삭제할 수 있다.', () => {
    cy.findByLabelText('버튼_0').click();
    cy.findByLabelText('알림_0').should('not.exist');
  });
});
