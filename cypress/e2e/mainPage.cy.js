describe("Tunnistepalvelut", () => {
  // runs before each test
  beforeEach(() => {
    cy.visit("localhost:8080");
  });

  it("Logo img should exist", () => {
    cy.get(".mainLogo").should("have.attr", "href").should("equal", "/"); // check that the logo exists and has the right href
    cy.get(".mainLogo").find("img").should("exist"); // check that there is an img inside the logo
  });

  it("Should have the title", () => {
    const title = "Tunnistepalvelut";
    // check if page has the title
    cy.get("h1").contains(title);
  });

  it("User can change the language of the page", () => {
    cy.changeLanguage("EN"); // change the language to english
    cy.get("html").should("have.attr", "lang", "en"); // check the language of the page
    cy.get(".bannerContainer").should("contain", "Identifier Services"); // check that the title is translated as well
  });

  it("User should click the Identifier Registry nav link and be redirected to the right page", () => {
    cy.get(".publicMenu").contains("Kustantajarekisteri").click(); // click the link
    cy.url().should("include", "/isbn-registry/publishers"); // check the url
  });

  it("User can change language on other pages as well", () => {
    cy.get(".publicMenu").contains("Kustantajarekisteri").click(); // click the link
    cy.changeLanguage("SV"); // change the language to english
    cy.get("html").should("have.attr", "lang", "sv"); // check the language of the page
    cy.get("h1").should("contain", "Identifikatorservice"); // check that the title is translated as well
  });

  it("Each nav element has Link or Button", () => {
    cy.get("nav").find("a").should("have.length", 3); // check that there are three links
    cy.get("nav").find("button").should("have.length", 1); // check that there is one button

    // loop through each item
    cy.get("nav").each(($item) => {
      // check that each item has a link or a button
      expect(
        $item.find("a").length || $item.find("button").length
      ).to.be.greaterThan(0);
    });
  });

  it("User is able to search publishers by name", () => {
    cy.get(".publicMenu").contains("Kustantajarekisteri").click(); // click the link
    cy.get("input").type("Suomen valtio"); // type in the input field
    cy.get("form").submit(); // submit the search form
    cy.get("tbody").should("contain", "Suomen valtio").should("have.length", 1); // check that result is correct
  });

  const socialMediaLinks = [
    "facebook",
    "twitter",
    "youtube",
    "instagram",
    "linkedin",
  ];

  for (const link of socialMediaLinks) {
    it(`Social media link with aria-label ${link} should exist in the footer`, () => {
      cy.get("footer").find(`a[aria-label="${link}"]`).should("exist"); // check that the link with the proper aria-label exists
    });
  }
});
