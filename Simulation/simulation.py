# Program for simulating choices bankers will face and outcomes of their decisions
from random import *


#  Running randomisations of probabilities and outcomes. See sub-comments.
def informationRandomiser():
    for i in range(0, 3):

        # # Determining whether stock portfolio is high (extreme) or low in risk and return
        # extreme = False
        # extremeDeterminator = randint(0, 100)
        #
        # if extremeDeterminator < 20:                    # probability of
        #     extreme = True                              # extreme condition 20% of the time
        #
        # # Determining probabilities and potential outcomes of stock portfolio
        # if extreme:
        #     firstProb = randint(2, 4) * 10       # 20 - 40%
        #     firstOutcome = randint(12, 17)       # 12 - 17 MNOK
        #     secondOutcome = randint(3, 7)        # 3 - 7 MNOK
        # else:

        firstProb = randint(4, 7) * 10       # 40 - 70%
        firstOutcome = randint(11, 16)       # 11 - 16 MNOK
        secondOutcome = randint(5, 9)        # 5 - 9 MNOK

        secondProb = 100 - firstProb

        global outcomeProbs
        outcomeProbs = str(firstProb) + "%: £" + str(firstOutcome) + "m\n" + \
                       str(secondProb) + "%: £" + str(secondOutcome) + "m"


        # Calculating expected value before luck is assigned for use in choiceMaker()
        global expectedValue
        expectedValue = ((firstProb / 100) * firstOutcome) + \
                        ((secondProb / 100) * secondOutcome)

        

        # Adding bad luck to competent banker, and good luck to incompetent
        if personalityList[i] == "Comp":
            firstProb -= 25
            secondProb += 25
        elif personalityList[i] == "Incomp":
            firstProb += 25
            secondProb -= 25

        

        # Making sure probabilities lie between 0 and 100
        if firstProb > 100:
            firstProb = 100
        elif firstProb < 0:
            firstProb = 0

        if secondProb > 100:
            secondProb = 100
        elif secondProb < 0:
            secondProb = 0
        

        # Creating list of possible stock outcomes and randomising outcome
        outcomeList = []

        for j in range(0, firstProb):
            outcomeList.append(firstOutcome)

        for j in range(0, secondProb):
            outcomeList.append(secondOutcome)

        global stockOutcome
        stockOutcome = (choice(outcomeList))

        global bondsOutcome
        bondsOutcome = 10.1

        choiceMaker(i)


#Determining banker's investment choice. See sub-comments.
def choiceMaker(i):

    # choiceList = []

    # Determining whether banker makes a correct or incorrect decision
    choiceProbability = randint(0, 100)

    if personalityList[i] == "Comp":
        if choiceProbability < 90:                          # makes correct decision 90% of the time
            compPersonDecision = "correct"
        else:
            compPersonDecision = "incorrect"
        choiceList.append(compPersonDecision)
        choiceListComp.append(compPersonDecision)

    elif personalityList[i] == "Avg":
        if choiceProbability < 50:                          # makes correct decision 50% of the time
            avgPersonDecision = "correct"
        else:
            avgPersonDecision = "incorrect"
        choiceList.append(avgPersonDecision)
        choiceListAvg.append(avgPersonDecision)

    elif personalityList[i] == "Incomp":
        if choiceProbability < 30:                         # makes correct decision 30% of the time
            incompPersonDecision = "correct"
        else:
            incompPersonDecision = "incorrect"
        choiceList.append(incompPersonDecision)
        choiceListIncomp.append(incompPersonDecision)
        
    # Displaying choice based on expected values and whether choice is correct / incorrect
    if choiceList[i] == "correct":
        if expectedValue > 10.1:
            personality[i].append(stockOutcome)
            investment[i].append("stock")
        else:
            personality[i].append(bondsOutcome)
            investment[i].append("bonds")
    else:
        if expectedValue <= 10.1:
            personality[i].append(stockOutcome)
            investment[i].append("stock")
        else:
            personality[i].append(bondsOutcome)
            investment[i].append("bonds")


# Creating personalities
personalityList = ["Comp", "Avg", "Incomp"]

choiceList = []
choiceListComp = []
choiceListAvg = []
choiceListIncomp = []

resultList = []
resultListComp = []
resultListAvg = []
resultListIncomp = []

investmentListComp = []
investmentListAvg = []
investmentListIncomp = []

personality = [resultListComp, resultListAvg, resultListIncomp]
investment = [investmentListComp, investmentListAvg, investmentListIncomp]

# Running program
runs = 10000
printableList = []

for i in range(0,runs):
    choiceList = []
    informationRandomiser()

#Competent person
correctChoiceComp = round(((choiceListComp.count("correct") / runs) * 100), 2)
stocksChoiceComp = round(((investmentListComp.count("stock") / runs) * 100), 2)
outcomeComp = round(((sum(resultListComp)) / runs), 2)

line1 = ("Competent person chose correct " + str(correctChoiceComp) + "% of the time, which equals stocks " + str(stocksChoiceComp) + "%.")
line2 = ("Competent person had an average result of $" + str(outcomeComp) + "m\n")
printableList.append(line1)
printableList.append(line2)

#Average person
correctChoiceAvg = round(((choiceListAvg.count("correct") / runs) * 100), 2)
stocksChoiceAvg = round(((investmentListAvg.count("stock") / runs) * 100), 2)
outcomeAvg = round(((sum(resultListAvg)) / runs), 2)

line3 = ("Average person chose correct " + str(correctChoiceAvg) + "% of the time, which equals stocks " + str(stocksChoiceAvg) + "%.")
line4 = ("Average person had an average result of $" + str(outcomeAvg) + "m\n")
printableList.append(line3)
printableList.append(line4)

#Competent person
correctChoiceIncomp = round(((choiceListIncomp.count("correct") / runs) * 100), 2)
stocksChoiceIncomp = round(((investmentListIncomp.count("stock") / runs) * 100), 2)
outcomeIncomp = round(((sum(resultListIncomp)) / runs), 2)

line5 = ("Incompetent person chose correct " + str(correctChoiceIncomp) + "% of the time, which equals stocks " + str(stocksChoiceIncomp) + "%.")
line6 = ("Incompetent person had an average result of $" + str(outcomeIncomp) + "m")
printableList.append(line5)
printableList.append(line6)

file = open("simulationResults.txt", "w")
file.write("Number of executions: " + str(runs))
for i in range(0,6):
    file.write(printableList[i])
    print(printableList[i])
file.close()