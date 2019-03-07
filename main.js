

//Get data for the TV Show "Friends"
fetch('http://api.tvmaze.com/shows/431?embed[]=episodes&embed[]=cast')
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        // console.log(json);


        //1 - Create a function called getGuntherCount() which returns the total number of episodes 
        // where the character Gunther is mentioned in the episode summary.
        console.log('--------------------------------');
        console.log(`Gunther Count: ${getGuntherCount(json)}`);
        console.assert(getGuntherCount(json) === 1, 'We wanted one show with Gunther mentioned.');

        //2 - Create a function called getTotalRuntimeMinutes() that totals all runtime minutes for all episodes
        console.log('--------------------------------');
        console.log(`Total Runtime Minutes: ${getTotalRuntimeMinutes(json)}`);
        console.assert(getTotalRuntimeMinutes(json) === 7080, 'Friends ran for a total of 7080 minutes!');

        //3 - Create a function called getDateRangeEpisodeCount() that returns the number of episodes that aired in the year 2000
        console.log('--------------------------------');
        console.log(`Total episodes airing in year 2000: ${getTotalEpisodesInYear(json, "2000")}`);
        console.assert(getTotalEpisodesInYear(json, "2000") === 25, 'There were 25 episodes of Friends in the year 2000');

        //4 - Create a function called getFemaleCastMembers() that returns an array of the names of the female cast members.
        console.log('--------------------------------');
        console.log(`Female Cast Members:`);
        let femaleCast = ["Lisa Kudrow", "Jennifer Aniston", "Courteney Cox"];
        console.log(getFemaleCastMembers(json));
        console.assert(getFemaleCastMembers(json).every((item) => {return femaleCast.includes(item)}), 'Return an array of ' + femaleCast);

        //5 - Create a function called getEpisodeTitles() which returns a list of episode
        //    where the argument string is found in the episode summary.
        console.log('--------------------------------');
        console.log(`Episodes that mention Ursula:`);
        let ursulaEps = ["The One Where Chandler Can't Cry", "The One Where They All Turn Thirty", "The One With the Stain"];
        console.log(getEpisodeTitles(json, 'Ursula'));
        console.assert(getEpisodeTitles(json, 'Ursula').every((item) => ursulaEps.includes(item)),  'Return an array of ' + ursulaEps);

        //6 - Create a function called getCastMembersOver55() which returns a list of cast members
        //    who are currently older than 55 years of age.
        console.log('--------------------------------');
        console.log(`Cast Members over 55:`);
        let over55s = ["Lisa Kudrow", "Courteney Cox"];
        console.log(getCastMembersOver55(json));
        console.assert(getCastMembersOver55(json).every((item) => over55s.includes(item)), 'Return an array of ' + over55s);

        //7 - Create a function called getTotalRuntimeMinutesExcludingSeasonSix that gets the total 
        //    runtime minutes for all episodes excluding episodes in season 6
        console.log('--------------------------------');
        console.log(`Total runtime in minutes excluding Season 6: ${getTotalRuntimeMinutesExcludingSeasonSix(json)}`);
        console.assert(getTotalRuntimeMinutesExcludingSeasonSix(json) === 6330, 'Total runtime minus S6 was 6330 minutes!');
    
        //8 - Create a function called getFirstFourSeasons that gets the episodes for the first four seasons 
        //    but only return an array of JSON objects containing the season number and episode name
        console.log('--------------------------------');
        console.log(`Episode JSON for first four seasons:`);
        let first4 =getFirstFourSeasons(json); 
        console.log(first4);
        console.assert(first4.every((item) => item.hasOwnProperty('name') && item.hasOwnProperty('season') 
            && first4.length === 97), 'Must include all 97 of the first 4 seasons.');

        //10 - Create a funtion called capitalizeTheFriends that transforms the episode JSON data by capitalizing the words Joey, Chandler, Monica, Rachel, Phoebe, and Ross
        //in the name  of the episode. Make sure you don't capitalize anything that isn't a name. I.e. CHANDLER CROSSes the road.
        console.log('--------------------------------');
        console.log('Capitalized Friends');
        console.log(capitalizeTheFriends(json));
    })
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------GUNTER FUNCTION------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//1 - Create a function called getGuntherCount() which returns the total number of episodes
// where the character Gunther is mentioned in the episode summary.
getGuntherCount = (json) => {
    //map and filter through object of episode arrays: 0-99, 100-199, 200-235
    let episodes = json._embedded.episodes;

    let epDesc = episodes.map(ep => ep.summary);

    let arr =[];

    function containsGunther(epDesc) {
        if (epDesc == null) {
            return;
        }

       else if (epDesc.indexOf("Gunther") === -1) {

            return;
        }

        else {
            arr.push(epDesc);
            return arr;
        }
    }

    epDesc.forEach(containsGunther);

    return arr.length;
};

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------TOTAL MINS FUNCTION--------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//2 - Create a function called getTotalRuntimeMinutes() that totals all runtime minutes for all episodes
getTotalRuntimeMinutes = (json) => {

    //save episodes to a variable so it is easy to work with
    let episodes = json._embedded.episodes;

    //get just the runtime
    const epRuntime = episodes.map(ep => ep.runtime);

    //reduce the runtime to get total and return it
    return epRuntime.reduce((total, amount) => total + amount);

};

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------TOTAL 2000s FUNCTION-------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//3 - Create a function called getDateRangeEpisodeCount() that returns the number of episodes that aired in the year 2000
getTotalEpisodesInYear = (json) => {

    //save episodes to a variable so it is easy to work with
    let episodes = json._embedded.episodes;

    //get just the air date
    const epDate = episodes.map(ep => ep.airdate);

    //set min and max values to filter out other episodes
    let min = "2000-01-01";
    let max = "2000-12-31";

    //filter them
    let result = epDate.filter(a => a > min && a < max);

    return result.length;

};

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------TOTAL WOMEN FUNCTION-------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//4 - Create a function called getFemaleCastMembers() that returns an array of the names of the female cast members.
getFemaleCastMembers = (json) => {

    //save cast to a variable so it is easy to work with
    let cast = json._embedded.cast;

   // console.log(json._embedded.cast[0].person.gender);

    //find the female cast members
    function filterGender(cast) {

        if(cast.person.gender === "Female") {

            return cast.person.gender;
        }
    }

    //get their names
    function getNames(femaleCast) {
        //push them to an array
        result.push(femaleCast.person.name);

        return result;
    }

    let result = [];

    let femaleCast = cast.filter(filterGender);

    femaleCast.forEach(getNames);

    //return the array of female cast member's names
    return result;


};

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------MATCHING TITLES FUNCTION---------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//5 - Create a function called getEpisodeTitles() which returns a list of episode where the argument string is found in the episode summary.
getEpisodeTitles = (json, arg) => {

    let episodes = json._embedded.episodes;

    //get the description
    let epDesc = episodes.map(ep => ep.summary);

    let arr =[];

    //check the episode description against the passed in query
    function filterItems(epDesc, episodes, query) {
        epDesc.filter(function(el, eps) {
                if (el === null) {
                    return;
                }

                else if (el.indexOf(query) === -1) {
                  return;
                }

                else {
                    //if it contains the query, push the name of the episode to an array and return it
                    arr.push(episodes[eps].name);
                    return arr;
                }
        });

        return arr;
    }

filterItems(epDesc, episodes, arg);

   return arr;
};

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------over 55 FUNCTION-----------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//6 - Create a function called getCastMembersOver55() which returns a list of cast members
//    who are currently older than 55 years of age.
getCastMembersOver55 = (json) => {

    //save cast to a variable so it is easy to work with
    let cast = json._embedded.cast;

    function filterAge(cast) {

        //check their age against older than 55 bday
        if(cast.person.birthday < "1965-01-01") {

            return cast.person;
        }
    }

    let olderCast = cast.filter(filterAge);

    //get the names of the older cast
    function getNames(olderCast) {
        result.push(olderCast.person.name);

        return result;
    }

    let result = [];

    olderCast.forEach(getNames);

    return result;

};

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------NOT S6 FUNCTION------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//7 - Create a function called getTotalRuntimeMinutesExcludingSeasonSix that gets the total
//    runtime minutes for all episodes excluding episodes in season 6
getTotalRuntimeMinutesExcludingSeasonSix = (json) => {

    //save episodes to a variable so it is easy to work with
    let episodes = json._embedded.episodes;

    // console.log(episodes);

    //exclude season 6 from the count
    function filters6(episodes) {
        return episodes.season !== 6;
    }

    let notS6 = episodes.filter(filters6);

    // console.log(notS6);

    //get just the runtime
    const epRuntime = notS6.map(ep => ep.runtime);

    //reduce the runtime to get total and return it
   return epRuntime.reduce((total, amount) => total + amount);

};

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------FIRST 4 FUNCTION-----------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//8 - Create a function called getFirstFourSeasons that gets the episodes for the first four seasons
//    but only return an array of JSON objects containing the season number and episode name
getFirstFourSeasons = (json) => {

    //save episodes to a variable so it is easy to work with
    let episodes = json._embedded.episodes;

    //get only the episodes we want
    function filterSeasons(episodes) {
        return episodes.season === 1 || episodes.season === 2 || episodes.season === 3 || episodes.season === 4;
    }

    let season1234 = episodes.filter(filterSeasons);

    let result = season1234.map(function (item) {
        let result = {
            "name" : item["name"],
            "season" : item["season"]}; //return "myKey" property only, if needed.

        return result;
    });

    return result;
};


//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------CAPITALIZED FUNCTION-------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//10 - Create a funtion called capitalizeTheFriends that transforms the episode JSON data by capitalizing the words Joey, Chandler, Monica, Rachel, Phoebe, and Ross
//in the name  of the episode. Make sure you don't capitalize anything that isn't a name. I.e. CHANDLER CROSSes the road.
capitalizeTheFriends = (json) => {

    let episodes = json._embedded.episodes;

    let epName = episodes.map(ep => ep.name);

  //  console.log(epName);

    let joey = "Joey";
    let chandler = "Chandler";
    let ross = "Ross";
    let monica = "Monica";
    let rachel = "Rachel";
    let phoebe = "Phoebe";

    let arr =[];

    //filter through and change names
    function filterItems(epName, episodes, joey, chandler, ross, monica, rachel, phoebe) {
        epName.filter(function(el, eps) {
            if (el.indexOf(joey) === -1 && el.indexOf(chandler) === -1 && el.indexOf(ross) === -1 && el.indexOf(monica) === -1 && el.indexOf(rachel) === -1 && el.indexOf(phoebe) === -1) {
                return;
            }

            else {

                let newName = episodes[eps].name.replace(joey, "JOEY").replace(ross, "ROSS").replace(monica, "MONICA").replace(rachel, "RACHEL").replace(phoebe, "PHOEBE");

                // console.log(newName);
                arr.push(newName);
                return arr;
            }
        });

        return arr;
    }

    filterItems(epName, episodes, joey, chandler, ross, monica, rachel, phoebe);

    return arr;
};