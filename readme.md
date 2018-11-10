Readme.md
This application is a basic stock search tool, allowing the user to 
    Build personal set of stocks to search by adding additional stocks to the display
    Each stock rendered is as a "live" button, and upon being pressed will retreive some company information
        information included is full name, last share price, its, stock symbol, and up to 10 recent articles
        

    An initial set of popular stocks are rendered


    Notes on adding additional stocks
        The application will verify if the proposed addition is avaialble on the latest active database of IEXTrading
        Notifications confirming the stock is valid, will include the addition of the new stock 
        Notificaiton dis-allowing the new stock will appear if in fact the new stock is not activly trading at IEXTrading
        IEXTrading utilizes all "upperCase" stock symbols, however this application will accomodate "lowerCase" stock symbols as well

    Notes on Articles being retreived
        To expedite scanning of avaialble articles, the titles, abridged summary, and the link to the entire article will be rendered allowing the consumer to more efficiently manage their time and efforts by allowing them to chose which articles to persue in their entirety 
