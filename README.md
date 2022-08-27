Highlights the most visited parts of a monopoly board. A "heat map" of the board.

Simulates a single player rolling the dice 100,000,000 times, and doing what
the spot on the board says (goto jail, chance card, etc). Tracks the number
of "terminal" visits on each spot of the board. A terminal visit means
that the user ended up there after a single dice roll. If a user lands on
a chance spot, and the chance card tells them to go to jail, then jail gets 
a visit... not the change spot.

Sample output:

```
Rolls: 100000000
Max visits: 3106373
Min visits: 1014611
norm 3.06 ==================================================
norm 2.07 ==========================
 com 1.83 ====================
norm  2.3 ================================
norm 2.37 =================================
  rr 2.99 ================================================
norm 2.23 ==============================
 cha    1
norm 2.27 ===============================
norm 2.27 ===============================
jail  5.9 =======================================================================================================================
norm 2.27 ===============================
util 2.86 =============================================
norm  2.5 ====================================
norm 2.57 ======================================
  rr 2.92 ===============================================
norm 2.66 ========================================
 com 2.35 =================================
norm 2.68 =========================================
norm 2.87 =============================================
norm 2.84 =============================================
norm  2.9 ==============================================
 cha 1.29 =======
norm 2.67 =========================================
norm 3.06 ==================================================
  rr 2.94 ===============================================
norm 2.62 =======================================
norm 2.66 ========================================
util 2.81 ============================================
norm 2.63 =======================================
goto
norm 2.66 ========================================
norm  2.4 ==================================
 com 2.19 =============================
norm 2.34 =================================
  rr 2.42 ==================================
 cha 1.05 =
norm 2.33 ================================
norm 2.16 ============================
norm 2.61 =======================================
```

The numbers in the second column refer to how often that spot is visited. For example
2 means "2x more often then the least visited spot". The bars show thsi visually.

These numbers and this heatmap is not random, and while it may vary *slightly* from run
to run the trends are the same.

