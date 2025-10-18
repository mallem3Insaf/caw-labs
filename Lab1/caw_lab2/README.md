# 5_5 The explanation of :focus
each time the user clicks or tabs an input box a style will get applied on it , a thick blue border in this case . this helps them identify and see which field they're typing in  
# 6_2
-because of CSS specificity the '<h1>' in the footer displays at 1.2em instead of 2em
-specificity determines which CSS rule applies when multiple rules target the same element. It's calculated based on the selector's components.

# Specificity Hierarchy (strongest to weakest):
1_ID selectors (#id)
2_Class/attribute selectors (.class, [type])
3_Type selectors (h1, div, p)

# In Our Example:
 'footer h1' = 2 type selectors = higher specificity
 'h1' = 1 type selector = lower specificity
